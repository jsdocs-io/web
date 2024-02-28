import stream from "stream";
import StreamValues from "stream-json/streamers/StreamValues";
import { promisify } from "util";

const pipeline = promisify(stream.pipeline);

const parseJSONStream = async <T>({
  jsonStream,
}: {
  jsonStream: stream.Readable;
}): Promise<T> => {
  let data;

  await pipeline(
    jsonStream,
    StreamValues.withParser(),
    new stream.Writable({
      // See https://github.com/uhop/stream-json/wiki/StreamValues
      write: ({ value }, _, done) => {
        data = value;
        done();
      },
      objectMode: true,
    })
  );

  return data as unknown as T;
};

export default parseJSONStream;
