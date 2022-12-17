import { AppDataSource } from '@/database';
import File from '@/database/entities/file';

function getEpisodes() {
  AppDataSource.manager.find(File, {
    where: [],
  });
}
