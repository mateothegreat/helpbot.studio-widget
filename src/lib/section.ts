export class Section {

    public id: string;
    public title: string;
    public description: string;

    public src?: string;
    public buttons: Array<{ label: string, path: string }>;

    public children?: Array<Section>;

}
