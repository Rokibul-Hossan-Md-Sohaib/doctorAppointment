/* eslint-disable prettier/prettier */
export const setMediaBitrate = (sdp, mediaType, bitrate) => {
  let sdpLines = sdp.split('\n'),
    // eslint-disable-next-line prettier/prettier
    mediaLineIndex = -1,
    mediaLine = 'm=' + mediaType,
    bitrateLineIndex = -1,
    bitrateLine = 'b=AS:' + bitrate;
  mediaLineIndex = sdpLines.findIndex(line => line.startsWith(mediaLine));

  // If we find a line matching “m={mediaType}”
  if (mediaLineIndex && mediaLineIndex < sdpLines.length) {
    // Skip the media line
    bitrateLineIndex = mediaLineIndex + 1;

    // Skip both i=* and c=* lines (bandwidths limiters have to come afterwards)
    while (
      sdpLines[bitrateLineIndex].startsWith('i=') ||
      sdpLines[bitrateLineIndex].startsWith('c=')
    ) {
      bitrateLineIndex++;
    }

    if (sdpLines[bitrateLineIndex].startsWith('b=')) {
      // If the next line is a b=* line, replace it with our new bandwidth
      sdpLines[bitrateLineIndex] = bitrateLine;
    } else {
      // Otherwise insert a new bitrate line.
      sdpLines.splice(bitrateLineIndex, 0, bitrateLine);
    }
  }

  // Then return the updated sdp content as a string
  return sdpLines.join('\n');
};
