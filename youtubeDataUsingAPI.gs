function youtubeScraper() {

  var spreadSheet = SpreadsheetApp.getActiveSpreadsheet()
  var activesheet = spreadSheet.getActiveSheet()

  var search = YouTube.Search.list("snippet, id", {q : "clash of clans", maxResults : 50})
  // Logger.log(search)

  var results = search.items.map((item) => [item.id.videoId, item.snippet.title, item.snippet.publishedAt])

  var ids = results.map((id) => id[0]).join(",")
  var stats = YouTube.Videos.list("statistics", {id : ids})
  var videoStats = stats.items.map((item) => [item.statistics.dislikeCount, item.statistics.likeCount, item.statistics.viewCount])

  activesheet.getRange(2, 1, results.length, results[0].length).setValues(results)
  activesheet.getRange(2, 3, videoStats.length, videoStats[0].length).setValues(videoStats)
  
}
