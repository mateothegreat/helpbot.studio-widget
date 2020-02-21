import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators }                        from '@angular/forms';
import { HelpbotService }                                 from './helpbot.service';

@Component({
    selector: 'helpbot',
    template: `

        <div class="wrapper mat-elevation-z10" cdkDrag>

            <div class="header mat-elevation-z10" cdkDragHandle>

                <div class="top">

                    <div (click)="helpbotService.navigateBackward()"
                         class="left">

                        <mat-icon *ngIf="helpbotService.history.length > 0">arrow_back</mat-icon>

                    </div>

                    <div class="center">

                        {{ title }}

                    </div>

                    <div class="right">

                        <mat-icon (click)="toggle()">close</mat-icon>

                    </div>

                </div>


                <div *ngIf="show" class="input mat-elevation-z10">

                    <mat-icon matPrefix>search</mat-icon>

                    <input autofocus
                           placeholder="Search Help"
                           [formControl]="formControl">

                </div>

            </div>

            <div *ngIf="show && helpbotService.current && helpbotService.current['children']" class="content">

                <div *ngFor="let section of helpbotService.current['children']"
                     class="section"
                     (click)="helpbotService.navigate(section.id)"
                     matRipple>

                    <div class="left">

                        {{ section.title }}

                    </div>

                    <div class="right">

                        <mat-icon>arrow_forward</mat-icon>

                    </div>

                </div>

            </div>

            <div *ngIf="show && helpbotService.current && !!!helpbotService.current['src'] && !!!helpbotService.current['children']"
                 class="content">

                <div *ngFor="let section of helpbotService.current"
                     class="section"
                     (click)="helpbotService.navigate(section.id)"
                     matRipple>

                    <div class="left">

                        {{ section.title }}

                    </div>

                    <div class="right">

                        <mat-icon>arrow_forward</mat-icon>

                    </div>

                </div>

            </div>

            <div class="src" *ngIf="show && helpbotService.current && helpbotService.current['src']">

                <markdown [src]="helpbotService.current['src']"></markdown>

                <div *ngIf="helpbotService.current['buttons']" class="buttons">

                    <div *ngFor="let button of helpbotService.current['buttons']"
                         class="section"
                         (click)="helpbotService.navigateExternal(button.path)"
                         matRipple>

                        <div class="left">

                            {{ button.label }}

                        </div>

                        <div class="right">

                            <mat-icon>arrow_forward</mat-icon>

                        </div>

                    </div>


                </div>

            </div>

            <div *ngIf="show" class="footer mat-elevation-z2">

                <div class="left">

                    Still have questions? Contact us!

                </div>

                <div class="right">

                    <mat-icon>arrow_forward</mat-icon>

                </div>


            </div>

        </div>

    `,
    styleUrls: [ './helpbot.component.scss' ]
})
export class HelpbotComponent implements OnInit {

    @Input() public title: string;
    @Input() public contentsUrl: string;
    @Input() public navigateToId: string;

    @Output() public contactClick: EventEmitter<string> = new EventEmitter();

    public show: boolean = true;
    public formControl: FormControl = new FormControl('', Validators.required);

    public constructor(public helpbotService: HelpbotService) {

    }

    public ngOnInit(): void {

        this.helpbotService.load(this.contentsUrl);

        if (this.navigateToId) {

            this.helpbotService.navigate(this.navigateToId, 0);

        }

    }

    public toggle(): void {

        this.show = !this.show;

    }

    public navigate(id: string): void {


    }

}
