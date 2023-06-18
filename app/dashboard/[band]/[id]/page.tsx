type EditBandPageProps = {
  params: { id: string };
};

function EditBandPage({ params }: EditBandPageProps) {
  return <>{params.id}</>;
}

export default EditBandPage;
