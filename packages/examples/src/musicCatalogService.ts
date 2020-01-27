import { ImusicRepository } from './ImusicRepository';
import { Track } from './models/trackClass';

export class MusicCatalogService {
    private repository: ImusicRepository;

    constructor(repository: ImusicRepository) {
        this.repository = repository;
    }

    get(): Track[] {
        return this.repository.get();
    }

    getById(id: number): Track | undefined{
        return this.repository.getById(id);
    }

    add(track: Track): number {
        return this.repository.add(track);
    }

    edit(id: number, track: Track): Track {
        return this.repository.edit(id, track);
    }

    delete(id: number): Track | null{
        return this.repository.delete(id);
    }
}