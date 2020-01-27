import { MusicCatalogService } from '../musicCatalogService';
import { ImusicRepository } from '../ImusicRepository';
import { Track } from '../models/trackClass';

describe('MusicCatalogService tests', () => {

  let sut: MusicCatalogService;
  
  let mockRepo: Track[] = new Array(
      new Track(1, "Mock Title 1", "The Mockers", 0),
      new Track(2, "Mock Title 2", "The Mockers 2", 0)
  );

  test('Should return Tracks value', () => {
    //Arrange
    const Mock = jest.fn<ImusicRepository>(() => ({
      get: jest.fn().mockReturnValue(mockRepo)
    }));
    const mock = new Mock();
    sut = new MusicCatalogService(mock);

    //Act
    var result = sut.get();

    //Assert
    expect(mock.get).toHaveBeenCalled();
    expect(result.length).toBe(2);
  });

});