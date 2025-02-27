"""
This py is used for get backend models from Google drive
Execute rclone ls to get all files in the RiskAware_Models/ directory. 
Parse the filenames and generate rclone link commands. 
Execute rclone link to get Google Drive sharing links. 
Save the results to a gdrive_links.txt file.
"""


import subprocess

REMOTE_NAME = "riskAware_models_drive"
REMOTE_PATH = "/RiskAware_Models/"

print("Fetching file list from Google Drive...")
ls_command = f"rclone ls {REMOTE_NAME}:{REMOTE_PATH}"
ls_result = subprocess.run(ls_command, shell=True, capture_output=True, text=True)

if ls_result.returncode != 0:
    print("Error fetching file list. Check your rclone configuration.")
    exit(1)

file_names = []
for line in ls_result.stdout.split("\n"):
    parts = line.strip().split(maxsplit=1)
    if len(parts) == 2:
        _, file_name = parts
        file_names.append(file_name)

output_file = "gdrive_links.txt"
print(f"Generating rclone links and saving to {output_file}...")

with open(output_file, "w") as f:
    for file_name in file_names:
        link_command = f"rclone link {REMOTE_NAME}:{REMOTE_PATH}{file_name}"
        link_result = subprocess.run(link_command, shell=True, capture_output=True, text=True)

        if link_result.returncode == 0:
            link = link_result.stdout.strip()
            f.write(f"{file_name}: {link}\n")
            print(f"{file_name} → {link}")
        else:
            print(f"Failed to get link for {file_name}")

print("\nOkk! All links saved to gdrive_links.txt!")