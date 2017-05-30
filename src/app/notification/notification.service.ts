export class NotificationService {

  private notifications: any[] = [];
  public title: string;
  public code: string;
  public message: string;
  public stacktrace: string;

  find(id: string) : any {
    for (let note of this.notifications) {
      if (note.id === id) {
          return note;
      }
    }
    return null;
  }

  add(note: any) {
    this.notifications.push(note);
  }

  remove(id: string) {
    let note = this.find(id);
    if (note) {
      this.notifications.splice(this.notifications.indexOf(note), 1);
    }
  }

  open(id: string) {
    let note = this.find(id);
    if (note) {
      note.set(this.title, this.code, this.message, this.stacktrace);
      note.open();
    }
  }

  close(id: string) {
    let note = this.find(id);
    if (note) {
      note.close();
    }
  }
}
