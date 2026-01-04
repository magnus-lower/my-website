import { on, selectAll } from "../../utils/dom.js";

const MEDIA_ATTRS = {
  src: "mediaSrc",
  alt: "mediaAlt",
  type: "mediaType",
  aspect: "mediaAspect",
};

function inferMediaType(src = "") {
  const extension = src.split(".").pop()?.toLowerCase();
  if (extension === "gif") return "gif";
  return "image";
}

function parseAspectRatio(value) {
  if (!value) return null;
  const parts = value.split("/").map((part) => part.trim());
  if (parts.length !== 2) return null;
  const [width, height] = parts;
  if (!width || !height) return null;
  return `${width} / ${height}`;
}

function getAspectDimensions(value) {
  const parts = value?.split("/").map((part) => Number(part.trim()));
  if (!parts || parts.length !== 2) return { width: 1600, height: 900 };
  const [widthRatio, heightRatio] = parts;
  if (!widthRatio || !heightRatio) return { width: 1600, height: 900 };
  const width = 1600;
  const height = Math.round((width * heightRatio) / widthRatio);
  return { width, height };
}

function createModal() {
  const modal = document.createElement("div");
  modal.className = "project-media-modal";
  modal.setAttribute("aria-hidden", "true");

  const backdrop = document.createElement("div");
  backdrop.className = "project-media-modal__backdrop";

  const content = document.createElement("div");
  content.className = "project-media-modal__content";
  content.setAttribute("role", "dialog");
  content.setAttribute("aria-modal", "true");

  const closeButton = document.createElement("button");
  closeButton.className = "project-media-modal__close";
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Close media");
  closeButton.textContent = "×";

  const image = document.createElement("img");
  image.className = "project-media-modal__image";
  image.alt = "";

  content.append(closeButton, image);
  modal.append(backdrop, content);

  document.body.append(modal);

  return { modal, backdrop, closeButton, image };
}

export function initProjectMedia() {
  const cards = selectAll(".project-item");
  if (!cards.length) return;

  let modalElements;

  const openModal = (src, alt) => {
    if (!modalElements) {
      modalElements = createModal();

      on(modalElements.backdrop, "click", () => closeModal());
      on(modalElements.closeButton, "click", () => closeModal());
      on(document, "keydown", (event) => {
        if (event.key === "Escape") closeModal();
      });
    }

    modalElements.image.src = src;
    modalElements.image.alt = alt || "";
    modalElements.modal.classList.add("is-open");
    modalElements.modal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    if (!modalElements) return;
    modalElements.modal.classList.remove("is-open");
    modalElements.modal.setAttribute("aria-hidden", "true");
    modalElements.image.src = "";
  };

  cards.forEach((card, index) => {
    const src = card.dataset[MEDIA_ATTRS.src];
    if (!src) return;

    const alt = card.dataset[MEDIA_ATTRS.alt] || "";
    const type = card.dataset[MEDIA_ATTRS.type] || inferMediaType(src);
    const aspectValue = card.dataset[MEDIA_ATTRS.aspect];
    const aspect = parseAspectRatio(aspectValue);
    const dimensions = getAspectDimensions(aspectValue);

    const wrapper = document.createElement("div");
    wrapper.className = "project-media";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "project-media__button";
    button.setAttribute("aria-label", "Open project media");

    const image = document.createElement("img");
    image.className = "project-media__image";
    image.src = src;
    image.alt = alt;
    image.setAttribute("data-media-type", type);
    image.loading = "eager";
    image.decoding = "async";
    image.width = dimensions.width;
    image.height = dimensions.height;

    if (index < 2) {
      image.setAttribute("fetchpriority", "high");
    }

    if (aspect) {
      wrapper.style.aspectRatio = aspect;
      image.classList.add("project-media__image--cover");
    }

    button.append(image);
    wrapper.append(button);

    card.prepend(wrapper);

    on(button, "click", (event) => {
      event.stopPropagation();
      openModal(src, alt);
    });
  });
}
