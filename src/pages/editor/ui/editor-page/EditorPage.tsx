import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { useCreateArticle } from '~features/article';
import { PATH_PAGE } from '~shared/lib/react-router';

type EditorPageProps = {
  edit?: boolean;
};

export function EditorPage(props: EditorPageProps) {
  const { edit } = props;
  console.log(edit);

  const createArtilce = useCreateArticle();

  const navigate = useNavigate();

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <Formik
              initialValues={{
                title: '',
                description: '',
                body: '',
                tagList: [''],
              }}
              // TODO: add correct validation
              validationSchema={object().shape({
                title: string().required('required'),
                description: string().required('required'),
                body: string().required('required'),
                tagList: string().required('required'),
              })}
              // TODO: handle server errors
              // TODO: navigate to article page
              onSubmit={async (values) => {
                await createArtilce.mutateAsync(values);
                navigate(PATH_PAGE.root);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <fieldset disabled={isSubmitting}>
                    <fieldset className="form-group">
                      <Field
                        name="title"
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Article Title"
                      />
                      <ErrorMessage name="title" />
                    </fieldset>
                    <fieldset className="form-group">
                      <Field
                        name="description"
                        type="text"
                        className="form-control"
                        placeholder="What's this article about?"
                      />
                      <ErrorMessage name="description" />
                    </fieldset>
                    <fieldset className="form-group">
                      <Field
                        name="body"
                        as="textarea"
                        className="form-control"
                        rows={8}
                        placeholder="Write your article (in markdown)"
                      />
                      <ErrorMessage name="body" />
                    </fieldset>
                    <fieldset className="form-group">
                      <Field
                        name="tagList"
                        type="text"
                        className="form-control"
                        placeholder="Enter tags"
                      />
                      <ErrorMessage name="tagList" />
                      <div className="tag-list" />
                    </fieldset>
                    <button
                      className="btn btn-lg pull-xs-right btn-primary"
                      type="submit"
                    >
                      Publish Article
                    </button>
                  </fieldset>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}