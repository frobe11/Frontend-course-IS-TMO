export async function requestImages(channelTag, start, end, sort) {
  const url = new URL(`http://localhost:1489/fetch-images/${channelTag}`);

  const params = {
    start: start,
    end: end,
    sort: sort,
  };
  appendQueryParams(url, params);

  const response = await fetch(url.href, {
    method: "GET",
    mode: "cors",
  });
  return await response.json();
}

function appendQueryParams(url, params) {
  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, params[key]);
  });
}

