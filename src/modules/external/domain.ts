interface Domain {
  domain: string;
  create_date: string;
  update_date: string;
  country: string;
  isDead: string;
}

export default interface DomainResponse {
  domains: Domain[];
  total: number;
  time: string;
  nextpage: number;
}
