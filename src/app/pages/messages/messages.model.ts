interface IPaginatorEvent {
  page: number;
  first: number;
  rows: number;
  pageCount: number;
}

interface IClientMessage {
  id?: string;
  name: string;
  email: string;
  text: string;
  createdAt: Date;
}

export { IPaginatorEvent, IClientMessage };
