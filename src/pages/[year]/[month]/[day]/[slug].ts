import type { APIRoute, GetStaticPaths } from "astro";
import { getLegacyPostRedirects } from "../../../../lib/legacy-routes";

export const prerender = true;

export const getStaticPaths = (async () => getLegacyPostRedirects()) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props, redirect }) => redirect(props.destination, 301);
