import fsqDevelopers from '@api/fsq-developers';

fsqDevelopers.auth('fsq3Px3REkK1S9AxNSOKbQOIAcR0fZSHRMJAkhwCUgtlmLc=');
fsqDevelopers.placeSearch()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));