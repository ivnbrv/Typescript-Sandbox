import { ImusicRepository } from "./ImusicRepository";
import { Track } from './models/trackClass';
import { inject, injectable, named } from 'inversify';

@injectable()
export class DiscCatalog implements ImusicRepository {
    
    private discList: Track[] = new Array(
        new Track(1, "Simmer", "Hayler Williams", 400),
        new Track(2, "x&y", "Coldplay", 350)
    );

    get(): Track[] {
        return this.discList;
    }

    getById(id: number): Track | undefined{
        return this.discList.find(track=> track.id== id);
     }

    add(track: Track): number {
        return this.discList.push(track);
    }

    edit(id: number, track: Track): Track {
        var targetIndex  = this.discList.findIndex((track  => track.id === id));

        this.discList[targetIndex].artist = track.artist;
        this.discList[targetIndex].title = track.title;
        this.discList[targetIndex].duration = track.duration;

        return this.discList[targetIndex];
    }

    delete(id: number): Track | null{
        var targetIndex = this.discList.findIndex((track => track.id == id));
        if (targetIndex < -1) return null;
        return this.discList.splice(targetIndex, 1)[0];
    }
}