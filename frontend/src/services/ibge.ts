import axios from "axios";

const service = {
  async getStates() {
    try {
      const { data } = await axios.get(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );

      const states = data.map((state: any) => state.sigla);

      return states;
    } catch (e) {
      console.error("ibge.getStates");
    }
  },

  async getCitys(UF: string) {
    try {
      const { data } = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/distritos`
      );

      const citys = data.map((city: any) => city.nome);

      return citys;
    } catch (e) {
      console.error("ibge.getStates");
    }
  },
};

export default service;
