import { ParsedFormData } from 'types';

const uploadFile = async (path: string, file: File, bucket: string) => {
  const filename = `${path}/${encodeURIComponent(file.name)}`;
  const response = await fetch(
    `/api/upload-url?filename=${filename}&bucket=${bucket}`
  );

  const { data } = await response.json();

  const formData = new FormData();
  Object.entries({ ...data.presignedPost.fields, file }).forEach(
    ([key, value]) => {
      const valueAny: any = value;
      formData.append(key, valueAny);
    }
  );
  const s3UploadResponse = await fetch(data.presignedPost.url, {
    method: 'POST',
    body: formData,
  });
  if (s3UploadResponse) {
    return { finalURL: data.finalURL };
  }

  return null;
};

const uploadFormFiles = async (formData: ParsedFormData, path: string) => {
  const formDataCopy = { ...formData };
  await Promise.all(
    Object.keys(formDataCopy).map(async (el) => {
      if (
        Object.prototype.isPrototypeOf.call(File.prototype, formDataCopy[el])
      ) {
        const routeUpload = await uploadFile(
          path,
          formDataCopy[el] as File,
          process.env.NEXT_PUBLIC_MEDIA_BUCKET_NAME ?? ''
        );

        formDataCopy[el] = routeUpload?.finalURL;
      }
    })
  );
  return formDataCopy;
};

export { uploadFormFiles };
