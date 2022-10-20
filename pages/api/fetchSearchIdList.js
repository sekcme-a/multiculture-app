const cheerio = require('cheerio')
const axios = require('axios')

export default async (req, res) => {
  if (req.method === 'POST') {
    const input = req.body.input
    const page = req.body.page
    let list = []
    try {
      res.statusCode = 200

      const fetchedHTML = await axios.get(`https://www.kmcn.kr/news/search_result.html?search=${encodeURI(input)}&page=${page}`)
      const $ = cheerio.load(fetchedHTML.data)
      $(".art_list_all > li").find('a').each((index, element) => {
        const id = parseInt($(element).attr("href").replace("/news/article.html?no=", ""))
        const thumbnailImg = $(element).children('span').children('img').attr("src")
        const temp = $(element).children("h2").contents()
        const title = temp.get(1).data
        const category = $(element).children("h2").children("i").text()
        const subtitle = $(element).children("p").text().substring(0, 100)+"..."
        const info = $(element).children("ul").children('.name').text() + "| " + $(element).children("ul").children('.date').text()
        // thumbnailImg = $(element).find("span > img").attr("src")
        // console.log(`asdf:${$(element).children('span').children('img').attr("src")}`)
        list.push({ id: id, thumbnailImg: thumbnailImg, title: title, subtitle: subtitle, info: info, category: category })
        console.log(list)
      })
      const $resultCount = $(".desc_all > i").text()

      return res.json({
        idList: list,
        resultCount: $resultCount
      })

      
    } catch (e) {
      res.statusCode = 404
      return res.json({
        fetchedHTML: "error",
        error: e.message
      })
    }
  }
}