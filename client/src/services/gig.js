import {toast} from "react-toastify";
import api from "../api";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

// Hizmetlerle alakalı API isteklerinin hepsinin burada belirleyeceğiz. İhtiyaç olunan yerde export edeceğiz.

const gigService = {
  getAll: (params) => api.get("/gig", {params}),
  getOne: (id) => api.get(`/gig/${id}`),
  create: (form, token) =>
    api.post("/gig", form, {headers: {Authorization: `Bearer ${token}`}}),
};

// Bütün hizmetleri al ve hafızada tut
const useGetAllGigs = (params) =>
  useQuery({
    queryKey: ["gigs", params],
    queryFn: () => gigService.getAll(params),
    select: (res) => res.data.data,
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
    mutationFn: (form, token) => gigService.create(form, token),
    onSuccess: (res) => {
      toast.success("Hizmet başarıyla oluşturuldu!");
      console.log("Oluşturulan gigin verisi:", res);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Hizmet oluşturulurken bir sorun oluştu.");
    },
  });
};

export {gigService, useGetAllGigs, useGetOneGig, useCreateGig};
