export const ADMIN_PWA_STATUS_EVENT = "admin-pwa-status";

type AdminPwaStatus = {
  offlineReady: boolean;
  updateReady: boolean;
};

let adminPwaRegistration: ServiceWorkerRegistration | null = null;
let adminPwaStatus: AdminPwaStatus = {
  offlineReady: false,
  updateReady: false,
};
let controllerChangeListenerAttached = false;

const emitAdminPwaStatus = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(ADMIN_PWA_STATUS_EVENT, {
      detail: { ...adminPwaStatus },
    })
  );
};

const updateAdminPwaStatus = (nextStatus: Partial<AdminPwaStatus>) => {
  const mergedStatus = {
    ...adminPwaStatus,
    ...nextStatus,
  };

  if (
    mergedStatus.offlineReady === adminPwaStatus.offlineReady &&
    mergedStatus.updateReady === adminPwaStatus.updateReady
  ) {
    return;
  }

  adminPwaStatus = mergedStatus;
  emitAdminPwaStatus();
};

const syncAdminPwaStatus = (registration: ServiceWorkerRegistration) => {
  adminPwaRegistration = registration;

  if (registration.waiting) {
    updateAdminPwaStatus({ offlineReady: true, updateReady: true });
    return;
  }

  if (registration.active) {
    updateAdminPwaStatus({ offlineReady: true, updateReady: false });
  }
};

export const getAdminPwaStatus = () => ({ ...adminPwaStatus });

export const requestAdminPwaUpdate = () => {
  adminPwaRegistration?.waiting?.postMessage({ type: "SKIP_WAITING" });
};

export const registerAdminPwa = async () => {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    });
    syncAdminPwaStatus(registration);

    if (!controllerChangeListenerAttached) {
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        window.location.reload();
      });
      controllerChangeListenerAttached = true;
    }

    registration.addEventListener("updatefound", () => {
      const installingWorker = registration.installing;
      if (!installingWorker) {
        return;
      }

      installingWorker.addEventListener("statechange", () => {
        if (installingWorker.state === "installed") {
          if (navigator.serviceWorker.controller) {
            updateAdminPwaStatus({ offlineReady: true, updateReady: true });
            return;
          }

          updateAdminPwaStatus({ offlineReady: true, updateReady: false });
        }
      });
    });

    try {
      const readyRegistration = await navigator.serviceWorker.ready;
      syncAdminPwaStatus(readyRegistration);
    } catch {
      syncAdminPwaStatus(registration);
    }
  } catch (error) {
    console.error("Failed to register Sylhety Admin service worker.", error);
  }
};
