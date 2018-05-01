import { NewsComponent } from './news.component';
import {EditNewsComponent} from './edit-news/edit-news.component';

export const routes = [
  {
    path: '', component: NewsComponent,
  },
  {
    path: 'edit-news', component: EditNewsComponent
  }
];
