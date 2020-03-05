function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
d3.json("samples.json").then((data) => {
  var metadata = data.metadata;
  console.log(metadata)
      // Use `.html("") to clear any existing metadata
      var result = metadata.filter(meta => meta.id.toString() === id)[0];

      var demographicInfo = d3.select("#sample-metadata");

      demographicInfo.html("");


    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach((key) => {
      demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
    });
});
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
d3.json("samples.json").then (sampledata => {
  console.log(sampledata)
  var ids = sampledata.samples[0].otu_ids;
  console.log(ids)
  var sampleValues = sampledata.samples[0].sample_values.slice(0,10).reverse();
  console.log(sampleValues)
  var labels = sampledata.samples[0].otu_ids.slice(0, 10);
  console.log(labels)
  var OTU_top = (sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
  var OTU_id = OTU_top.map(d => "OTU " + d);
  console.log(`OTU IDS: ${OTU_id}`)
  var trace = {
    x: sampleValues,
    y: OTU_id,
    text: labels,
    marker: {
      color: "blue"},
      type: "bar",
      orientation: "h"
    };
  var data = [trace];

  var layout = {
    title: "Top 10 OTU",
    yaxis:{
      tickmode: "linear",
    },
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 30
    }
  };
  Plotly.newPlot("bar", data, layout);

  var trace1 = {
    x: sampledata.samples[0].otu_ids,
    y: sampledata.samples[0].sample_values,
    mode: "markers",
    marker: {
      size: sampledata.samples[0].sample_values,
      color: sampledata.samples[0].otu_ids
    },
    text: sampledata.samples[0].otu_labels
  };
  var layout_2 = {
    xaxis: {title: "OTU ID"},
    height: 600,
    width: 1000
  };

  var data1 = [trace1];

  Plotly.newPlot("bubble", data1, layout_2);


});
    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();