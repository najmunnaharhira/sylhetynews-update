import { useEffect, useState } from "react";
import {
  ADMIN_PWA_STATUS_EVENT,
  getAdminPwaStatus,
  requestAdminPwaUpdate,
} from "../lib/pwa";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

const isStandaloneDisplay = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const iosNavigator = navigator as Navigator & { standalone?: boolean };
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    iosNavigator.standalone === true
  );
};

export default function PwaPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [installed, setInstalled] = useState(isStandaloneDisplay());
  const [pwaStatus, setPwaStatus] = useState(getAdminPwaStatus());

  useEffect(() => {
    const syncStatus = () => {
      setPwaStatus(getAdminPwaStatus());
    };

    syncStatus();
    window.addEventListener(ADMIN_PWA_STATUS_EVENT, syncStatus as EventListener);

    return () => {
      window.removeEventListener(ADMIN_PWA_STATUS_EVENT, syncStatus as EventListener);
    };
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      const promptEvent = event as BeforeInstallPromptEvent;
      promptEvent.preventDefault();
      setDeferredPrompt(promptEvent);
      setDismissed(false);
    };

    const handleAppInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
      setDismissed(true);
      setInstalling(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt as EventListener);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }

    setInstalling(true);

    try {
      await deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === "accepted") {
        setDeferredPrompt(null);
        setDismissed(true);
      }
    } finally {
      setInstalling(false);
    }
  };

  const handleUpdate = () => {
    setUpdating(true);
    requestAdminPwaUpdate();
  };

  const showUpdatePrompt = pwaStatus.updateReady;
  const showInstallPrompt =
    !installed && !showUpdatePrompt && !dismissed && (Boolean(deferredPrompt) || pwaStatus.offlineReady);

  if (!showUpdatePrompt && !showInstallPrompt) {
    return null;
  }

  const title = showUpdatePrompt
    ? "A newer admin version is ready"
    : "Install the admin panel";
  const description = showUpdatePrompt
    ? "Refresh into the latest app shell before you upload new stories, media, or categories."
    : deferredPrompt
      ? "Open Sylhety News Admin like an app for faster access. News drafts stay on this device if the tab closes unexpectedly."
      : "This admin panel is install-ready. If your browser does not show the install button here, open the browser menu and choose Install app.";

  return (
    <aside className="pwa-banner" role="status" aria-live="polite">
      <span className={`pwa-badge ${showUpdatePrompt ? "update" : "install"}`}>
        {showUpdatePrompt ? "Update ready" : "Installable"}
      </span>
      <h2 className="pwa-banner-title">{title}</h2>
      <p className="pwa-banner-text">{description}</p>
      <div className="pwa-banner-actions">
        {showUpdatePrompt ? (
          <button type="button" className="pwa-button" onClick={handleUpdate} disabled={updating}>
            {updating ? "Updating..." : "Update now"}
          </button>
        ) : deferredPrompt ? (
          <button type="button" className="pwa-button" onClick={handleInstall} disabled={installing}>
            {installing ? "Installing..." : "Install app"}
          </button>
        ) : (
          <span className="pwa-install-hint">Use your browser menu to install the app.</span>
        )}
        <button
          type="button"
          className="pwa-button secondary"
          onClick={() => setDismissed(true)}
        >
          {showUpdatePrompt ? "Later" : "Close"}
        </button>
      </div>
    </aside>
  );
}
