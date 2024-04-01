export interface MovableOrigin {
  x: 'auto' | 'start' | 'end';
  y: 'auto' | 'start' | 'end';
}

export interface MovableOptions {
  origin: MovableOrigin;
  onMoved?: () => void;
}

export class Movable {
  static defaultOptions: {
    origin: MovableOrigin;
  } = {
    origin: { x: 'auto', y: 'auto' },
  };

  private dragging: { x: number; y: number };

  private options: MovableOptions;

  constructor(
    private el: HTMLElement,
    options?: Partial<MovableOptions>,
  ) {
    this.setOptions(options);
  }

  setOptions(options: Partial<MovableOptions>) {
    this.options = {
      ...Movable.defaultOptions,
      ...options,
    };
  }

  onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = this.el.getBoundingClientRect();
    const { clientX, clientY } = e;
    this.dragging = { x: clientX - x, y: clientY - y };
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  };

  onMouseMove = (e: MouseEvent) => {
    if (!this.dragging) return;
    const { x, y } = this.dragging;
    const { clientX, clientY } = e;
    const position = {
      top: 'auto',
      left: 'auto',
      right: 'auto',
      bottom: 'auto',
    };
    const { clientWidth, clientHeight } = document.documentElement;
    const width = this.el.offsetWidth;
    const height = this.el.offsetHeight;
    const left = Math.min(clientWidth - width, Math.max(0, clientX - x));
    const top = Math.min(clientHeight - height, Math.max(0, clientY - y));
    const { origin } = this.options;
    if (
      origin.x === 'start' ||
      (origin.x === 'auto' && left + left + width < clientWidth)
    ) {
      position.left = `${left}px`;
    } else {
      position.right = `${clientWidth - left - width}px`;
    }
    if (
      origin.y === 'start' ||
      (origin.y === 'auto' && top + top + height < clientHeight)
    ) {
      position.top = `${top}px`;
    } else {
      position.bottom = `${clientHeight - top - height}px`;
    }
    Object.assign(this.el.style, position);
  };

  onMouseUp = () => {
    this.dragging = null;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    this.options.onMoved?.();
  };

  enable() {
    this.el.addEventListener('mousedown', this.onMouseDown);
  }

  disable() {
    this.dragging = undefined;
    this.el.removeEventListener('mousedown', this.onMouseDown);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
}
