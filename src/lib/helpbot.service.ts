import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Section }    from './section';

const findItemNested = (arr, itemId, nestingKey) => (

    arr.reduce((a, item) => {

        if (a) {

            return a;

        }

        if (item.id === itemId) {

            return item;

        }

        if (item[ nestingKey ]) {

            return findItemNested(item[ nestingKey ], itemId, nestingKey);

        }

    }, null)

);

@Injectable({
    providedIn: 'root'
})
export class HelpbotService {

    public contents: Array<Section>;
    public current: Section | Array<Section>;
    public history: Array<string> = [];

    public constructor(private httpClient: HttpClient) {

    }

    public load(contentsUrl: string): void {

        this.httpClient.get(contentsUrl).subscribe((contents: Array<Section>) => {

            this.contents = contents;
            this.current = contents;

        });

    }

    public navigateBackward(): void {

        if (this.history.length > 0) {

            this.history = this.history.filter(id => id !== this.history[ this.history.length - 1 ]);

            this.navigate(this.history[ this.history.length - 1 ], 0, false);

        } else {

            this.history = [];
            this.navigate(null);

        }

    }

    public navigate(id: string, delaySeconds: number = 150, history: boolean = true): void {

        setTimeout(() => {

            this.current = (id) ? findItemNested(this.contents, id, 'children') : this.contents;

            if (this.current && history && id) {

                this.history.push(id);

            }

        }, delaySeconds);

    }

    public navigateExternal(id: string): void {


    }

}
