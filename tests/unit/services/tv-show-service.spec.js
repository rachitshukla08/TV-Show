import {getAllTVShows,searchTVShow} from '../../../services/TvShowService'
import axios from 'axios'

jest.mock('axios');

describe('In TV Show Service',()=>{
  it('getAllTVShows should have been called',()=>{
    const mockedResponse = { show: 'Show Name' }
    axios.get.mockResolvedValue(mockedResponse);
    getAllTVShows().then((result)=>{
        expect(result).toBe(mockedResponse);
      })
  });

  it('searchTVShow should have been called',()=>{
    const mockedResponse = { show: 'Show Name' }
    axios.get.mockResolvedValue(mockedResponse);
    searchTVShow('Show Name').then((result)=>{
        expect(result).toBe(mockedResponse);
      })
  });
});
