import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ExternalService {
  constructor(private httpService: HttpService) {}

  async getDomains(domain: string): Promise<any> {
    const response = await this.httpService
      .get(`https://api.domainsdb.info/v1/domains/search?domain=${domain}`)
      .toPromise();

    return response.data;
  }
}
