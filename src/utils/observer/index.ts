class Observer {
  private static _instance: Observer;

  constructor() {
    if (!Observer._instance) {
      Observer._instance = this;
    }
    return Observer._instance;
  }

  notify(id: string, _date: Date, status: 'ENTER' | 'EXIT' | 'CLICK') {
    if (status === 'ENTER') {
      console.log('Enter in ', id, ' screen at', _date);
    } else if (status === 'EXIT') {
      console.log('Exit by ', id, ' screen at', _date);
    } else if (status === 'CLICK') {
      console.log('Click by ', id, ' screen at', _date);
    }
  }
}

export const observer = new Observer();
