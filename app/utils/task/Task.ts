interface Listener {
  type: 'progress' | 'error' | 'stop' | 'start';
  once?: boolean;
  listener: (event: any) => void;
}

interface ITask {
  start(): PVoid;
}

export class Task implements ITask {
  public progress = 0;
  public status?: 'STARTED' | 'STOPPED' = 'STOPPED';
  public listeners = new Set<Listener>();

  /**
   * 执行
   */
  start(): PVoid {
    throw new Error('Method not implemented.');
  }

  /**
   * 停止
   */
  public stop(): void {
    this.status = 'STOPPED';
    this.progress = 0;
    this.sendEvent('stop');
  }

  public on(type: Listener['type'], listener: Listener['listener']): () => void {
    const listenerItem = {
      type,
      listener,
    };
    this.listeners.add(listenerItem);

    return () => {
      this.listeners.delete(listenerItem);
    };
  }

  public once(type: Listener['type'], listener: Listener['listener']) {
    const listenerItem = {
      type,
      once: true,
      listener,
    };
    this.listeners.add(listenerItem);

    return () => {
      this.listeners.delete(listenerItem);
    };
  }

  public removeAllListeners(): void {
    this.listeners.clear();
  }

  public removeListeners(listener: Listener): void {
    this.listeners.delete(listener);
  }

  public sendEvent(type: Listener['type'], event?: any): void {
    this.listeners.forEach((item) => {
      if (item.type === type) {
        item.listener(event);
        if (item.once) {
          this.removeListeners(item);
        }
      }
    });
  }
}
