import { User } from '../../user/models/user.model';

export interface Message {
    id: string;
    sentDate: string;
    sender: User;
    receiver: User;
    content: string;
}
