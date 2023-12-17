//https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation

const putInCache = async (request, response) => {
  const cache = await caches.open("v1");
  await cache.put(request, response);
};

const cacheFirst = async ({ request, fallbackUrl }) => {
  // 首先尝试从缓存中获取资源。
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  // 如果在缓存中找不到响应，则尝试通过网络获取资源。
  try {
    const responseFromNetwork = await fetch(request);
    // 如果网络请求成功，将响应克隆一份：
    // - 将副本放入缓存，供下一次使用
    // - 将原始响应返回给应用程序
    // 需要克隆响应，因为响应只能使用一次。
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    // 如果网络请求失败，则从缓存中获取备用响应。
    const fallbackResponse = await caches.match(fallbackUrl);
    if (fallbackResponse) {
      return fallbackResponse;
    }
    // 当连备用响应也不可用时，我们无能为力，
    // 但我们必须返回一个响应对象。
    return new Response("网络错误", {
      status: 408,
      headers: { "Content-Type": "text/plain" },
    });
  }
};

self.addEventListener("fetch", (event) => {
  event.respondWith(
    cacheFirst({
      request: event.request,
      fallbackUrl: "/fallback.html",
    }),
  );
});
