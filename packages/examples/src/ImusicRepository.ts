import { Track } from './models/trackClass';

export interface ImusicRepository {
    get() : Track[];
    getById(id: number) : Track | undefined;
    add(track: Track): number;
    edit(id: number, track: Track): Track;
    delete(id: number): Track | null;
}