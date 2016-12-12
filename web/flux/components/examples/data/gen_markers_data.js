import immutable from 'immutable';
import fetch from 'node-fetch';

const K_PITER_LAT_LNG = {lat: 40.75, lng: -74};

export default function genMarkersData({data, count, seed: seedNumber, latVarM, lngVarM, test, typeGetter}) {
  // seed(seedNumber);
  const K_P_COUNT = 10;
  const LAT_RAND_OFF = ((Math.random() * 2) - 1) * 0.1;
  const LNG_RAND_OFF = ((Math.random() * 2) - 1) * 0.1;
  const fakeData = data.Items.sort((a,b) => b.timestamp - a.timestamp);
  let markersData = new immutable.List(fakeData)
    .map((data, i) => new immutable.Map({
      id: 'uuid_' + data.uuid,
      lat: (Math.round(data.lat * 100) / 100) + LAT_RAND_OFF,
      lng: (Math.round(data.lng * 100) / 100) + LNG_RAND_OFF,
      title: data.name,
      description: data.comment,
      address: data.location,
      image: data.imgUrl || 'https://me-tw-s3-server.herokuapp.com/s3/uploads/3aff15ea-3b57-4817-aed3-79bfec3d08ad_marriage_logo.jpg',
      type: (typeGetter ? typeGetter(i) : i % 2), // i % 4,
      timestamp: data.timestamp
    }))
    .toList(); // we need List not Seq

  if (test) {
    markersData = markersData
      .push(new immutable.Map({ // this marker i use to test positioning https://www.dropbox.com/s/oybq1nvogjfstlj/Screenshot%202015-05-06%2017.46.32.png?dl=0
        id: 'red selo',
        lat: 59.724465,
        lng: 30.080121,
        title: 'KRASNOYE SELO CIRCLE',
        description: 'circle',
        address: 'circle',
        image: imageRndUrl(),
        type: 0,
        number: '500$'
      }))
      .push(new immutable.Map({
        id: 'alaska',
        lat: 65.670915,
        lng: -153.093992,
        title: 'ALASKA',
        description: 'alaska',
        address: 'alaska',
        image: imageRndUrl(),
        type: 0,
        number: '501$'
      }));
  }

  return markersData;
  // const fakeData = [
  //   {
  //     lat: 40.75,
  //     lng: -74,
  //     title: 'Cafe Philo 5',
  //     description: ' Lets pass marriage equality for Taiwan!',
  //     location: 'Stonewall Inn',
  //     image: '',
  //     number: 'Cafe Philo'
  //   },
  //   {
  //     lat: 42.3132878,
  //     lng: -71.19,
  //     title: 'BU TSA',
  //     description: ' Lets pass marriage equality for Taiwan!',
  //     location: 'Havard Square',
  //     image: '',
  //     number: 'BU TSA'
  //   },
  //   {
  //     lat: 40.3439888,
  //     lng: -74.6536421,
  //     title: 'Princeton TSU',
  //     description: ' Lets pass marriage equality for Taiwan!',
  //     location: 'Princeton Hall',
  //     image: '',
  //     number: 'Princeton TSU'
  //   },
  //   {
  //     lat: 37.8759419,
  //     lng: -122.31,
  //     title: 'Berkeley TSU',
  //     description: ' Lets pass marriage equality for Taiwan!',
  //     location: 'Berkeley Hall',
  //     image: '',
  //     number: 'Princeton TSU'
  //   }
  // ];
}
