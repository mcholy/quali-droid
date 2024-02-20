import { authResponse, loginDTO, tokensDTO } from '../models/model';
import axiosWithHeaders from '../utils/axiosWithHeaders';
import { urlAuth, urlToken } from '../utils/endpoints';

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
