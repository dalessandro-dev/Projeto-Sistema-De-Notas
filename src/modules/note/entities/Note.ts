import { randomUUID } from 'crypto';
import { Replace } from 'src/utilities/Replace';

interface NoteProps {
  title: string;
  description: string | null;
  createdAt: Date;
  userId: string;
}

export class Note {
  private props: NoteProps;
  private _id: string;

  constructor(
    props: Replace<
      NoteProps,
      { createdAt?: Date; description?: string | null }
    >,
    id?: string,
  ) {
    this.id = id || randomUUID();
    this.props = {
      ...props,
      description: props.description || null,
      createdAt: props.createdAt || new Date(),
    };
  }

  set id(id: string) {
    this._id = id;
  }

  set title(title: string) {
    this.props.title = title;
  }

  set description(description: string | null) {
    this.props.description = description;
  }

  get description() {
    return this.props.description;
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get userId() {
    return this.props.userId;
  }

  get title() {
    return this.props.title;
  }
}
