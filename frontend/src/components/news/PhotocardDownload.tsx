interface PhotocardDownloadProps {
  imageUrl?: string;
  title: string;
  label?: string;
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
}

const toFileName = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "photocard";

const baseClassName =
  "inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

const PhotocardDownload = ({ imageUrl, title, label, onClick, disabled = false }: PhotocardDownloadProps) =>
  onClick ? (
    <button
      type="button"
      onClick={() => {
        void onClick();
      }}
      disabled={disabled}
      className={baseClassName}
    >
      {label ?? "Download Photocard"}
    </button>
  ) : (
    <a
      href={imageUrl}
      download={`${toFileName(title)}.jpg`}
      target="_blank"
      rel="noopener noreferrer"
      className={baseClassName}
      aria-disabled={disabled}
      onClick={(event) => {
        if (disabled || !imageUrl) {
          event.preventDefault();
        }
      }}
    >
      {label ?? "Download Photocard"}
    </a>
  );

export default PhotocardDownload;
