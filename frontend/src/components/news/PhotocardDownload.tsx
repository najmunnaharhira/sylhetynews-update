interface PhotocardDownloadProps {
  imageUrl: string;
  title: string;
  label?: string;
}

const toFileName = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "photocard";

const PhotocardDownload = ({ imageUrl, title, label }: PhotocardDownloadProps) => (
  <a
    href={imageUrl}
    download={`${toFileName(title)}.jpg`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
  >
    {label ?? "Download Photocard"}
  </a>
);

export default PhotocardDownload;
