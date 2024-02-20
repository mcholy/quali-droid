import {
  CalculationFormCreationDto,
  CalculationParams,
  PaginationInfo,
  authResponse,
  calculationResponse,
  computeResult,
  loginDTO,
  tokensDTO,
} from '../models/model';
import axiosWithHeaders from '../utils/axiosWithHeaders';
import { urlAuth, urlCompute, urlToken } from '../utils/endpoints';

export async function login(credentials: loginDTO) {
  try {
    const response = await axiosWithHeaders.post<authResponse>(
      `${urlAuth}/login`,
      credentials,
    );
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function refreshToken(tokens: tokensDTO) {
  try {
    const response = await axiosWithHeaders.post<authResponse>(
      `${urlToken}/refresh`,
      tokens,
    );
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function compute(
  calculation: CalculationFormCreationDto,
  pagination: CalculationParams,
) {
  try {
    const response = await axiosWithHeaders.get<calculationResponse[]>(
      `${urlCompute}`,
      {
        params: {
          inputOne: calculation.inputOne,
          inputTwo: calculation.inputTwo,
          sampleSize: calculation.sampleSize,
          pageSize: pagination.pageSize,
          pageNumber: pagination.pageNumber,
        },
      },
    );
    const responseData = response.data;
    const paginationHeader: string | undefined =
      response.headers['x-pagination'];

    if (!paginationHeader) {
      throw new Error('No Header.');
    }
    const paginationInfo: PaginationInfo = JSON.parse(paginationHeader);
    const calculationResponse: computeResult = {
      calculations: responseData,
      pagination: paginationInfo,
    };
    return calculationResponse;
  } catch (error) {
    console.error('Error:', error);
  }
}
