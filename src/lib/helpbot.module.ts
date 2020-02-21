import { DragDropModule }                                                     from '@angular/cdk/drag-drop';
import { HttpClient, HttpClientModule }                                       from '@angular/common/http';
import { NgModule }                                                           from '@angular/core';
import { ReactiveFormsModule }                                                from '@angular/forms';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatRippleModule } from '@angular/material';
import { BrowserAnimationsModule }                                            from '@angular/platform-browser/animations';
import { ResizableModule }                                                    from 'angular-resizable-element';
import { MarkdownModule }                                                     from 'ngx-markdown';
import { HelpbotComponent }                                                   from './helpbot.component';

@NgModule({

    declarations: [

        HelpbotComponent

    ],

    imports: [

        BrowserAnimationsModule,
        DragDropModule,
        HttpClientModule,
        MarkdownModule.forRoot({ loader: HttpClient }),
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRippleModule,
        ReactiveFormsModule,
        ResizableModule

    ],

    exports: [

        HelpbotComponent

    ]

})
export class HelpbotModule {
}
