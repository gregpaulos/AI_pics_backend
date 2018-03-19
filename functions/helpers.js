function description_combiner(rawlist) {
    let groupedResults = {};
    rawlist.forEach(row => {
      if (groupedResults[row.id]) {
        if (groupedResults[row.id][row["api_name"]]) {
          groupedResults[row.id][row["api_name"]].unshift(row["description"]);
        } else {
          groupedResults[row.id][row["api_name"]] = [row["description"]];
        }
      } else {
        groupedResults[row.id] = { photo_url: row["photo_url"] };
        groupedResults[row.id][row["api_name"]] = [row["description"]];
      }
    });
    return groupedResults;
  }
  
  module.exports = {
    description_combiner
  };