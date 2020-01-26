import 'reflect-metadata';

import { Container } from 'inversify';

import SERVICE_IDENTIFIER from './Identifiers';
import { ImusicRepository } from './ImusicRepository';
import { DiscCatalog } from './discCatalog';

let container = new Container();

container.bind<ImusicRepository>(SERVICE_IDENTIFIER.ImusicRepository).to(DiscCatalog);

export default container;