import { Routes } from '@angular/router';
import { ActivityPage } from './pages/activity-page/activity-page';
import { ActivityViewer } from './pages/activity-page/activity-viewer/activity-viewer';
import { ActivityEditor } from './pages/activity-page/activity-editor/activity-editor';
import { LandingPage } from './pages/landing-page/landing-page';

export const routes: Routes = [
    { path: '', component: LandingPage, pathMatch: 'full' },
    { path: '', component: ActivityPage, pathMatch: 'full' },
    { path: 'activities', component: ActivityPage, pathMatch: 'full' },
    { path: 'activity/:id', component: ActivityViewer, pathMatch: 'full' },
    { path: 'activity-editor', component: ActivityEditor, pathMatch: 'full' },
    { path: 'activity-editor/:id', component: ActivityEditor, pathMatch: 'full' },
    
];