import { CategoriesComponent } from './categories.component';
import { AddTypeComponent } from './add-type/add-type.component';

export const routes = [
    {path: '', component: CategoriesComponent},
    { path: 'add-type', component: AddTypeComponent },
];
