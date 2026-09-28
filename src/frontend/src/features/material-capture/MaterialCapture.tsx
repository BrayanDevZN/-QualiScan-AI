import {
  ArrowRight,
  Camera,
  Check,
  CheckCircle2,
  Crop,
  FileImage,
  ImagePlus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { type ChangeEvent, type PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Button, Surface } from "@/components/ui";

type SelectedImage = {
  fileName: string;
  fileSize: string;
  src: string;
};

type CapturePhase = "capture" | "submitted";

type Selection = {
  height: number;
  width: number;
  x: number;
  y: number;
};

type SelectionPoint = Pick<Selection, "x" | "y">;

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function MaterialCapture() {
  const [image, setImage] = useState<SelectedImage>();
  const [phase, setPhase] = useState<CapturePhase>("capture");
  const [uploadError, setUploadError] = useState<string>();
  const [selection, setSelection] = useState<Selection>();
  const [selectionStart, setSelectionStart] = useState<SelectionPoint>();
  const [cameraActive, setCameraActive] = useState(false);
  const uploadInput = useRef<HTMLInputElement>(null);
  const cameraInput = useRef<HTMLInputElement>(null);
  const videoPreview = useRef<HTMLVideoElement>(null);
  const cameraStream = useRef<MediaStream | undefined>(undefined);

  useEffect(() => {
    if (!cameraActive || !videoPreview.current || !cameraStream.current) return;
    videoPreview.current.srcObject = cameraStream.current;
    void videoPreview.current.play();
  }, [cameraActive]);

  useEffect(() => {
    return () => cameraStream.current?.getTracks().forEach((track) => track.stop());
  }, []);

  function stopCamera() {
    cameraStream.current?.getTracks().forEach((track) => track.stop());
    cameraStream.current = undefined;
    if (videoPreview.current) videoPreview.current.srcObject = null;
    setCameraActive(false);
  }

  async function openCamera() {
    setUploadError(undefined);

    if (!navigator.mediaDevices?.getUserMedia) {
      cameraInput.current?.click();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: { ideal: "environment" } },
      });
      cameraStream.current = stream;
      setCameraActive(true);
    } catch (error) {
      const errorName = error instanceof DOMException ? error.name : "";
      if (errorName === "NotAllowedError") {
        setUploadError("Permita o acesso à câmera no navegador para tirar a foto.");
      } else if (errorName === "NotFoundError") {
        setUploadError("Nenhuma câmera foi encontrada neste dispositivo.");
      } else {
        setUploadError("Não foi possível abrir a câmera. Tente selecionar uma imagem.");
      }
    }
  }

  function takePhoto() {
    const video = videoPreview.current;
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
      setUploadError("A câmera ainda está carregando. Aguarde um instante e tente novamente.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    if (!context) {
      setUploadError("Não foi possível registrar a foto.");
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    setImage({
      fileName: `foto-${new Date().toISOString().replace(/[:.]/g, "-")}.jpg`,
      fileSize: `${canvas.width} × ${canvas.height} px`,
      src: canvas.toDataURL("image/jpeg", 0.92),
    });
    setSelection(undefined);
    setUploadError(undefined);
    setPhase("capture");
    stopCamera();
  }

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Selecione um arquivo de imagem válido.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("A imagem deve ter no máximo 10 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      setImage({ fileName: file.name, fileSize: formatFileSize(file.size), src: reader.result });
      setSelection(undefined);
      setUploadError(undefined);
      setPhase("capture");
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  }

  function useDemoImage() {
    setImage({
      fileName: "material-demonstracao.webp",
      fileSize: "Imagem simulada",
      src: "/assets/images/qualiscan-industrial-inspection.webp",
    });
    setUploadError(undefined);
    setSelection(undefined);
    setPhase("capture");
  }

  function clearImage() {
    setImage(undefined);
    setSelection(undefined);
    setUploadError(undefined);
    setPhase("capture");
  }

  function getSelectionPoint(event: ReactPointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    return {
      x: Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width)),
      y: Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height)),
    };
  }

  function beginSelection(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = getSelectionPoint(event);
    setSelectionStart(point);
    setSelection({ height: 0, width: 0, x: point.x, y: point.y });
  }

  function updateSelection(event: ReactPointerEvent<HTMLDivElement>) {
    if (!selectionStart) return;
    const point = getSelectionPoint(event);
    setSelection({
      height: Math.abs(point.y - selectionStart.y),
      width: Math.abs(point.x - selectionStart.x),
      x: Math.min(point.x, selectionStart.x),
      y: Math.min(point.y, selectionStart.y),
    });
  }

  function finishSelection(event: ReactPointerEvent<HTMLDivElement>) {
    if (!selectionStart) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setSelectionStart(undefined);
    setSelection((current) => {
      if (!current || current.width < 0.025 || current.height < 0.025) return undefined;
      return current;
    });
  }

  function cropSelection() {
    if (!image || !selection) return;

    const source = new window.Image();
    source.onload = () => {
      const sourceX = Math.round(selection.x * source.naturalWidth);
      const sourceY = Math.round(selection.y * source.naturalHeight);
      const sourceWidth = Math.max(1, Math.round(selection.width * source.naturalWidth));
      const sourceHeight = Math.max(1, Math.round(selection.height * source.naturalHeight));
      const canvas = document.createElement("canvas");
      canvas.width = sourceWidth;
      canvas.height = sourceHeight;
      const context = canvas.getContext("2d");

      if (!context) {
        setUploadError("Não foi possível recortar esta imagem.");
        return;
      }

      context.drawImage(
        source,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        sourceWidth,
        sourceHeight,
      );

      const baseName = image.fileName.replace(/\.[^.]+$/, "");
      setImage({
        fileName: `${baseName}-recorte.jpg`,
        fileSize: `${sourceWidth} × ${sourceHeight} px`,
        src: canvas.toDataURL("image/jpeg", 0.92),
      });
      setSelection(undefined);
      setUploadError(undefined);
    };
    source.onerror = () => setUploadError("Não foi possível abrir a imagem para recorte.");
    source.src = image.src;
  }

  if (phase === "submitted" && image) {
    return (
      <Surface className="overflow-hidden border-t-4 border-t-success">
        <div className="grid md:grid-cols-[15rem_1fr]">
          <div className="min-h-52 bg-surface-overlay">
            <img alt="Material selecionado para análise" className="size-full object-contain" src={image.src} />
          </div>
          <div className="p-6 sm:p-8">
            <span className="inline-flex border-b-2 border-success pb-2 text-success">
              <CheckCircle2 aria-hidden className="size-6" />
            </span>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.15em] text-success">Imagem recebida</p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-ink">Material pronto para análise</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-ink-muted">
              O protótipo concluiu a etapa de captura. O reconhecimento do material e os pontos de atenção serão apresentados na Parte 5.
            </p>

            <ul className="mt-6 grid gap-3 text-sm text-ink-muted sm:grid-cols-3">
              <li className="flex items-center gap-2"><Check aria-hidden className="size-4 text-success" /> Imagem anexada</li>
              <li className="flex items-center gap-2"><Check aria-hidden className="size-4 text-success" /> Formato validado</li>
              <li className="flex items-center gap-2"><Check aria-hidden className="size-4 text-success" /> Pronta para IA</li>
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild icon={<ArrowRight aria-hidden className="size-4" />}>
                <Link state={{ fileName: image.fileName, imageSrc: image.src }} to="/analysis">Ver resultado da inspeção</Link>
              </Button>
              <Button icon={<RotateCcw aria-hidden className="size-4" />} onClick={() => setPhase("capture")} variant="secondary">
                Revisar imagem
              </Button>
            </div>
          </div>
        </div>
      </Surface>
    );
  }

  return (
    <Surface className="overflow-hidden">
      <input accept="image/*" capture="environment" className="sr-only" onChange={selectFile} ref={cameraInput} type="file" />
      <input accept="image/*" className="sr-only" onChange={selectFile} ref={uploadInput} type="file" />

      {!image && cameraActive ? (
        <div className="p-5 sm:p-8">
          <div className="overflow-hidden border border-line bg-[#252529]">
            <div className="relative grid min-h-[22rem] place-items-center sm:min-h-[30rem]">
              <video
                aria-label="Visualização ao vivo da câmera"
                autoPlay
                className="max-h-[30rem] w-full object-contain"
                muted
                playsInline
                ref={videoPreview}
              />
              <div aria-hidden className="pointer-events-none absolute inset-5 border border-white/30" />
              <p className="absolute left-1/2 top-5 -translate-x-1/2 bg-black/65 px-3 py-2 text-center text-xs font-semibold text-white">
                Posicione toda a peça dentro do enquadramento
              </p>
            </div>
            <div className="flex flex-col gap-4 border-t border-white/15 bg-[#252529] p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-white/70">A foto só será mantida nesta demonstração local.</p>
              <div className="flex flex-col-reverse gap-2 sm:flex-row">
                <Button className="border-white/50 bg-transparent text-white hover:bg-white/10" onClick={stopCamera} variant="secondary">
                  Cancelar
                </Button>
                <Button className="border-white bg-white text-brand hover:bg-[#f2f2f0]" icon={<Camera aria-hidden className="size-4" />} onClick={takePhoto}>
                  Tirar foto
                </Button>
              </div>
            </div>
          </div>
          {uploadError && <p className="mt-3 text-xs font-semibold text-danger" role="alert">{uploadError}</p>}
        </div>
      ) : !image ? (
        <div className="p-5 sm:p-8">
          <div className="grid min-h-[27rem] place-items-center border border-line bg-surface-raised px-5 py-10 text-center">
            <div className="max-w-md">
              <span className="mx-auto inline-flex border-b-2 border-brand pb-3 text-brand">
                <ImagePlus aria-hidden className="size-7" />
              </span>
              <h2 className="mt-6 text-2xl font-bold tracking-[-0.03em] text-ink">Adicione uma foto do material</h2>
              <p className="mt-3 text-sm leading-6 text-ink-muted">
                Centralize a peça, garanta boa iluminação e deixe visível toda a região que será inspecionada.
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button icon={<Camera aria-hidden className="size-4" />} onClick={openCamera}>
                  Abrir câmera
                </Button>
                <Button icon={<FileImage aria-hidden className="size-4" />} onClick={() => uploadInput.current?.click()} variant="secondary">
                  Selecionar arquivo
                </Button>
              </div>

              <button className="mt-6 text-sm font-semibold text-brand hover:underline" onClick={useDemoImage} type="button">
                Usar imagem de demonstração
              </button>
              <p className="mt-4 text-xs text-ink-subtle">Formatos aceitos: JPG, PNG e WebP</p>
              {uploadError && <p className="mt-2 text-xs font-semibold text-danger" role="alert">{uploadError}</p>}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="relative flex min-h-[25rem] items-center justify-center overflow-hidden bg-[#252529] p-4 sm:min-h-[32rem]">
            <p className="pointer-events-none absolute left-1/2 top-4 z-20 -translate-x-1/2 bg-white/95 px-3 py-2 text-center text-xs font-semibold text-ink">
              Arraste sobre a foto para selecionar uma área
            </p>
            <div
              aria-label="Área de seleção da foto"
              className="relative inline-block max-h-[23rem] max-w-full cursor-crosshair touch-none overflow-hidden sm:max-h-[30rem]"
              onPointerCancel={finishSelection}
              onPointerDown={beginSelection}
              onPointerMove={updateSelection}
              onPointerUp={finishSelection}
              role="application"
            >
              <img
                alt="Pré-visualização do material selecionado"
                className="pointer-events-none block max-h-[23rem] max-w-full select-none object-contain sm:max-h-[30rem]"
                draggable={false}
                src={image.src}
              />
              {selection && selection.width > 0 && selection.height > 0 && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute border-2 border-white outline outline-2 outline-brand"
                  style={{
                    boxShadow: "0 0 0 9999px rgb(0 0 0 / 0.48)",
                    height: `${selection.height * 100}%`,
                    left: `${selection.x * 100}%`,
                    top: `${selection.y * 100}%`,
                    width: `${selection.width * 100}%`,
                  }}
                >
                  <span className="absolute -left-1.5 -top-1.5 size-3 bg-brand ring-2 ring-white" />
                  <span className="absolute -right-1.5 -top-1.5 size-3 bg-brand ring-2 ring-white" />
                  <span className="absolute -bottom-1.5 -left-1.5 size-3 bg-brand ring-2 ring-white" />
                  <span className="absolute -bottom-1.5 -right-1.5 size-3 bg-brand ring-2 ring-white" />
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-line bg-white p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-ink">{image.fileName}</p>
                <p className="mt-1 text-xs text-ink-subtle">{image.fileSize} · Pronta para revisão</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {selection && (
                  <>
                    <Button icon={<Crop aria-hidden className="size-4" />} onClick={cropSelection} size="sm">
                      Usar área selecionada
                    </Button>
                    <Button onClick={() => setSelection(undefined)} size="sm" variant="ghost">
                      Limpar seleção
                    </Button>
                  </>
                )}
                <Button icon={<RotateCcw aria-hidden className="size-4" />} onClick={() => uploadInput.current?.click()} size="sm" variant="secondary">
                  Trocar foto
                </Button>
                <Button aria-label="Remover foto" icon={<Trash2 aria-hidden className="size-4" />} onClick={clearImage} size="icon" variant="ghost" />
              </div>
            </div>

            <div className="mt-6 border-t border-line pt-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
              <p className="text-xs leading-5 text-ink-muted">
                {selection ? "Aplique o recorte antes de continuar ou limpe a seleção para usar a foto inteira." : "Ao continuar, a imagem será usada somente nesta demonstração local."}
              </p>
              <Button className="mt-4 w-full shrink-0 sm:mt-0 sm:w-auto" disabled={Boolean(selection)} icon={<ArrowRight aria-hidden className="size-4" />} onClick={() => setPhase("submitted")}>
                Analisar material
              </Button>
            </div>
          </div>
        </div>
      )}
    </Surface>
  );
}
