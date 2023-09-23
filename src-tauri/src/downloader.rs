use reqwest::Client;
use std::cmp::min;
use std::fs::File;
use futures_util::StreamExt;
use std::io::Write;

pub fn create_client() -> Client {
    return Client::new();
}

#[tauri::command]
pub async fn download_file(url: &str, path: &str) -> Result<(), String> {
    // Getting total size of file
    let res = create_client()
        .get(url)
        .send()
        .await
        .or(Err(format!("Failed to get content length from '{}'", &url)))?;
    let total_size = res
        .content_length()
        .ok_or(format!("Failed to get content length from '{}'", &url))?;

    // Downloading file chunks
    let mut file = File::create(path).or(Err(format!("Failed to create file '{}'", path)))?;
    let mut downloaded: u64 = 0;
    let mut stream = res.bytes_stream();

    while let Some(item) = stream.next().await {
        let chunk = item.or(Err("Error while downloading file"))?;
        file.write_all(&chunk)
            .or(Err("Error while writing to file"))?;
        let new_downloaded = min(downloaded + (chunk.len() as u64), total_size);
        downloaded = new_downloaded; 

        // Sending file download progress to client
    }

    Ok(())
}