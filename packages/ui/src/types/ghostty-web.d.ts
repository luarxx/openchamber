export {};

declare module 'ghostty-web' {
  export interface ITerminalOptions {
    lineHeight?: number;
  }

  export interface RendererOptions {
    lineHeight?: number;
  }

  export interface IBufferPosition {
    x: number;
    y: number;
  }

  export interface IBufferRange {
    start: IBufferPosition;
    end: IBufferPosition;
  }

  export interface ILink {
    text: string;
    range: IBufferRange;
    activate(event: MouseEvent): void;
    hover?(isHovered: boolean): void;
    dispose?(): void;
  }

  export interface ILinkDetector {
    getLinkAt(col: number, row: number): Promise<ILink | undefined>;
  }

  export interface Terminal {
    linkDetector?: ILinkDetector;
  }
}
