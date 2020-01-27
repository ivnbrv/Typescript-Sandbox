import { ImusicRepository } from './ImusicRepository';
import container from './installer';
import { MusicCatalogService } from './musicCatalogService';
import SERVICE_IDENTIFIER from './Identifiers';
 
//Composition root
let musicRepo = container.get<ImusicRepository>(SERVICE_IDENTIFIER.ImusicRepository);
let service = new MusicCatalogService(musicRepo);

console.log(service.get());