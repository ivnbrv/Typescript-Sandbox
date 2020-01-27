export class Track {
    
    constructor(id: number, title:string, artist:string, duration: number){
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.duration = duration;
    }

    public id: number;
    public title: string;
    public artist: string;
    public duration: number;
}
