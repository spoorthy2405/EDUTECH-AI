const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucketName = process.env.GCLOUD_STORAGE_BUCKET;

async function storeAnswerInCloud(examId, answers) {
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(`answers/${examId}.json`);
  await file.save(JSON.stringify(answers), { contentType: "application/json" });
  return file.publicUrl();
}

async function retrieveAnswerFromCloud(examId) {
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(`answers/${examId}.json`);
  const [data] = await file.download();
  return JSON.parse(data.toString());
}

module.exports = { storeAnswerInCloud, retrieveAnswerFromCloud };
