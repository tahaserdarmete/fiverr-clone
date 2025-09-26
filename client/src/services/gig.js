import {toast} from "react-toastify";
import api from "../api";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

// Hizmetlerle alakalı API isteklerinin hepsinin burada belirleyeceğiz. İhtiyaç olunan yerde export edeceğiz.

const gigService = {
  getAll: (params) => api.get(`/gig`, {params}),
  getOne: (id) => api.get(`/gig/${id}`),
  create: (form, token) =>
    api.post("/gig", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  update: (form, token, id) =>
    api.patch(`/gig/${id}`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  delete: (id, token) =>
    api.delete(`/gig/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

// Bütün hizmetleri al ve hafızada tut
const useGetAllGigs = (params) =>
  useQuery({
    queryKey: ["gigs", params],
    queryFn: () => gigService.getAll(params),
    select: (res) => {
      console.log(res.data.data);
      return res.data.data;
    },
  });

// Tek bir hizmeti al ve hafızada tut
const useGetOneGig = (id) =>
  useQuery({
    queryKey: ["gig"],
    queryFn: () => gigService.getOne(id),
    select: (res) => res.data.data,
  });

// Yeni bir gig oluşturma fonksiyonu
const useCreateGig = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["createGig"],
    mutationFn: ({form, token}) => gigService.create(form, token),
    onSuccess: (res) => {
      toast.success("Hizmet başarıyla oluşturuldu!");

      navigate(`/detail/${res.data.data._id}`);
    },
    onError: (error) => {
      console.log(error.response.data.message);
      toast.error("Hizmet oluşturulurken bir sorun oluştu.");
    },
  });
};

const useUpdateGig = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["updateGig"],
    mutationFn: ({form, token, id}) => gigService.update(form, token, id),
    onSuccess: (res) => {
      console.log("resonse:", res);
      toast.info("Hizmet başarıyla güncellendi.");

      navigate(`/detail/${res.data.data._id}`);
    },
    onError: (error) => {
      console.log(error.response.data.message);
      toast.error("Hizmet güncellenirken bir sorun oluştu.");
    },
  });
};

const useDeleteGig = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["deleteGig"],
    mutationFn: ({id, token}) => gigService.delete(id, token),
    onSuccess: (res) => {
      toast.info("Hizmet başarıyla silindi.");
      navigate("/");
    },
    onError: (err) => {
      toast.info("Bir hata oluştu!");
      console.error(err.response.data.message);
    },
  });
};

export {
  gigService,
  useGetAllGigs,
  useGetOneGig,
  useCreateGig,
  useUpdateGig,
  useDeleteGig,
};
