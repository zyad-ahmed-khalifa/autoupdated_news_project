function getData(category="sports", search="") {
    $.ajax({
        url: `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=d129cd50adb043b1b543981412ddd8d3`,
        type: "GET",
        success: function (data) {
            let newsData = data.articles
            $("main .row").html("")
            newsData.forEach(item => {
                if (search === "") {
                    $("main .row").append(`
                    <div class="col">
                        <div class="card position-relative rounded-4 overflow-hidden mb-4">
                            <img src="${item.urlToImage || "../../autoupdated_news_project/imgs/placeholder.png"}" class="card-img-top" alt="...">
                            <a href="${item.url}" class="text-black d-block">
                                <div class="card-body position-absolute bottom-0">
                                    <h5 class="card-title bg-white px-2 py-2 rounded-top mb-0"><span class="px-2 rounded-1">${item.source.name || "unknown"}</span></h5>
                                    <div class="card-text p-2 bg-white rounded-end">
                                        <p class="content fw-medium mb-2 fs-5">${item.content || "no content"}</p>
                                        <p class="description text-black-50 mb-0 fs-6">${item.description || "no description"}</p>
                                    </div>
                                    <div class="info bg-white d-flex align-items-center px-2 py-2 rounded-bottom">
                                        <i class="fa-solid fa-circle-user fs-5 me-2"></i>
                                        <p class="author me-1 mb-0">${item.author || "unknown"}</sp>
                                        <p class="date mb-0 text-black-50" title="${item.publishedAt || "unknown"}">${item.publishedAt || "unknown"}</sp>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    `)
                } else if ((item.content != null && item.content.toLowerCase().includes(search)) || (item.description != null && item.description.toLowerCase().includes(search)) || (item.author != null && item.author.toLowerCase().includes(search))) {
                    $("main .row").append(`
                    <div class="col">
                        <div class="card position-relative rounded-4 overflow-hidden mb-4">
                            <img src="${item.urlToImage || "../../autoupdated_news_project/imgs/placeholder.png"}" class="card-img-top" alt="...">
                            <a href="${item.url}" class="text-black d-block">
                                <div class="card-body position-absolute bottom-0">
                                    <h5 class="card-title bg-white px-2 py-2 rounded-top mb-0"><span class="px-2 rounded-1">${item.source.name || "unknown"}</span></h5>
                                    <div class="card-text p-2 bg-white rounded-end">
                                        <p class="content fw-medium mb-2 fs-5">${item.content || "no content"}</p>
                                        <p class="description text-black-50 mb-0 fs-6">${item.description || "no description"}</p>
                                    </div>
                                    <div class="info bg-white d-flex align-items-center px-2 py-2 rounded-bottom">
                                        <i class="fa-solid fa-circle-user fs-5 me-2"></i>
                                        <p class="author me-1 mb-0">${item.author || "unknown"}</sp>
                                        <p class="date mb-0 text-black-50" title="${item.publishedAt || "unknown"}">${item.publishedAt || "unknown"}</sp>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    `)
                }
            });
        },
        error: function (data) {
            $("<p></p>", {
                text: "404, not found",
                class: "m-auto text-center fw-bold display-3 w-100 alert alert-danger"
            }).appendTo("main .row")
            $("form input, form select").attr("disabled", "true")
        }
    })
}
getData()

$("form").on("change keyup", function (e) {
    e.preventDefault()
    getData(`${$("form select").val() || "sports"}`, $("input").val())
})

